import { computed, inject, reactive, ref, onMounted, onBeforeUnmount, CSSProperties } from 'vue'
import { injectKeyPreviewRef, injectKeyProps } from './types'
import './SplitPane.css'
import { toVue } from '@vueireact/core'

interface SplitPaneProps {
  layout?: 'horizontal' | 'vertical'
  children?: {
    left?: () => JSX.Element
    right?: () => JSX.Element
  }
}

function SplitPane(props: SplitPaneProps) {
  const isVertical = computed(() => props.layout === 'vertical')

  const containerRef = ref<HTMLDivElement | null>(null)
  const previewRef = inject(injectKeyPreviewRef)!

  // mobile only
  const { store, splitPaneOptions } = inject(injectKeyProps)!
  const layoutReverse = ref(false)


  const state = reactive({
    dragging: false,
    split: 50,
    viewHeight: 0,
    viewWidth: 0,
  })

  const boundSplit = computed(() => {
    const { split } = state
    return split < 20 ? 20 : split > 80 ? 80 : split
  })

  let startPosition = 0
  let startSplit = 0

  function dragStart(e: MouseEvent) {
    state.dragging = true
    startPosition = isVertical.value ? e.pageY : e.pageX
    startSplit = boundSplit.value

    changeViewSize()
  }

  function dragMove(e: MouseEvent) {
    if (containerRef.value && state.dragging) {
      const position = isVertical.value ? e.pageY : e.pageX
      const totalSize = isVertical.value
        ? containerRef.value.offsetHeight
        : containerRef.value.offsetWidth
      const dp = position - startPosition
      state.split = startSplit + +((dp / totalSize) * 100).toFixed(2)

      changeViewSize()
    }
  }

  function dragEnd() {
    state.dragging = false
  }

  function changeViewSize() {
    const el = previewRef.value
    if (!el) return
    state.viewHeight = el.offsetHeight
    state.viewWidth = el.offsetWidth
  }

  // Handle events for drag operations
  const handleMouseMove = (e: MouseEvent) => dragMove(e)
  const handleMouseUp = () => dragEnd()
  const handleMouseLeave = () => dragEnd()

  // Set up and clean up event listeners
  onMounted(() => {
    if (containerRef.value) {
      containerRef.value.addEventListener('mousemove', handleMouseMove)
      containerRef.value.addEventListener('mouseup', handleMouseUp)
      containerRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onBeforeUnmount(() => {
    if (containerRef.value) {
      containerRef.value.removeEventListener('mousemove', handleMouseMove)
      containerRef.value.removeEventListener('mouseup', handleMouseUp)
      containerRef.value.removeEventListener('mouseleave', handleMouseLeave)
    }
  })

  // Define styles
  const containerStyle = {
    display: 'flex',
    height: '100%',
    position: 'relative',
  } as CSSProperties

  const leftStyle = computed(() => ({
    position: 'relative',
    height: '100%',
    [isVertical.value ? 'height' : 'width']: `${boundSplit.value}%`,
    borderRight: isVertical.value ? 'none' : '1px solid var(--border)',
    borderBottom: isVertical.value ? '1px solid var(--border)' : 'none',
  } as CSSProperties))

  const rightStyle = computed(() => ({
    position: 'relative',
    height: '100%',
    [isVertical.value ? 'height' : 'width']: `${100 - boundSplit.value}%`,
  } as CSSProperties))

  const draggerStyle = computed(() => ({
    position: 'absolute',
    zIndex: 3,
    cursor: isVertical.value ? 'ns-resize' : 'ew-resize',
    ...(isVertical.value 
      ? { 
          top: 'auto',
          height: '10px',
          width: '100%',
          left: 0,
          right: 0,
          bottom: '-5px',
        } 
      : {
          top: 0,
          bottom: 0,
          right: '-5px',
          width: '10px',
        }),
  } as CSSProperties))

  const viewSizeStyle = {
    position: 'absolute',
    top: '40px',
    left: '10px',
    fontSize: '12px',
    color: 'var(--text-light)',
    zIndex: 100,
  } as CSSProperties

  const togglerStyle = {
    zIndex: 3,
    fontFamily: 'var(--font-code)',
    color: 'var(--text-light)',
    position: 'absolute',
    left: '50%',
    bottom: '20px',
    backgroundColor: 'var(--bg)',
    padding: '8px 12px',
    borderRadius: '8px',
    transform: 'translateX(-50%)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.25)',
  } as CSSProperties

  return () => (
    <div
      ref={containerRef}
      class={`split-pane ${state.dragging ? 'dragging' : ''} ${store.value.showOutput ? 'show-output' : ''} ${layoutReverse.value ? 'reverse' : ''} ${isVertical.value ? 'vertical' : ''}`}
      style={containerStyle}
    >
      <div
        class="left"
        style={leftStyle.value}
      >
        {props.children?.left?.()}
        <div 
          class="dragger" 
          style={draggerStyle.value}
          onMousedown={(e: MouseEvent) => {
            e.preventDefault()
            dragStart(e)
          }} 
        />
      </div>
      <div
        class="right"
        style={rightStyle.value}
      >
        {state.dragging ? (
          <div class="view-size" style={viewSizeStyle}>
            {`${state.viewWidth}px x ${state.viewHeight}px`}
          </div>
        ) : null}
        {props.children?.right?.()}
      </div>

      <button 
        class="toggler" 
        style={togglerStyle}
        onClick={() => { store.value.showOutput = !store.value.showOutput }}
      >
        {store.value.showOutput
          ? splitPaneOptions.value.codeTogglerText || '< Code'
          : splitPaneOptions.value.outputTogglerText || 'Output >'}
      </button>
    </div>
  )
}

export default toVue(SplitPane) 
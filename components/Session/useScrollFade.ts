import { onMounted, onUnmounted, ref } from 'vue'

export function useScrollFade() {
  // Refs for DOM elements
  const containerRef = ref<HTMLElement | null>(null)
  const leftFadeRef = ref<HTMLElement | null>(null)
  const rightFadeRef = ref<HTMLElement | null>(null)

  // Scroll state
  const scrolledToLeft = ref(true)
  const scrolledToRight = ref(true)

  const updateScrollState = () => {
    const el = containerRef.value
    if (!el) return

    // Update scroll state with 1px buffer for floating point precision
    scrolledToRight.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1
    scrolledToLeft.value = el.scrollLeft <= 1

    // Update right fade position and dimensions
    if (rightFadeRef.value) {
      rightFadeRef.value.style.transform = `translateX(${el.scrollLeft}px)`
      rightFadeRef.value.style.height = `${el.clientHeight}px`
      rightFadeRef.value.style.top = `${el.scrollTop}px`
    }

    // Update left fade position and dimensions
    if (leftFadeRef.value) {
      leftFadeRef.value.style.transform = `translateX(${el.scrollLeft}px)`
      leftFadeRef.value.style.height = `${el.clientHeight}px`
      leftFadeRef.value.style.top = `${el.scrollTop}px`
    }
  }

  const setupScrollListener = () => {
    const el = containerRef.value
    if (el) {
      el.addEventListener('scroll', updateScrollState)
      // Initial check
      updateScrollState()
    }
  }

  const cleanupScrollListener = () => {
    containerRef.value?.removeEventListener('scroll', updateScrollState)
  }

  onMounted(setupScrollListener)
  onUnmounted(cleanupScrollListener)

  return {
    // Refs
    containerRef,
    leftFadeRef,
    rightFadeRef,
    // State
    scrolledToLeft,
    scrolledToRight,
  }
}

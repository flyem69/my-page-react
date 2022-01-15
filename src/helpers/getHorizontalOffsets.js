function getHorizontalOffsets(boundingClientRect) {
    const width = boundingClientRect.right - boundingClientRect.left
    const innerOffset = width / 2
    const offsetLeft = boundingClientRect.left + innerOffset
    const offsetRight = window.innerWidth - boundingClientRect.right + innerOffset
    return [offsetLeft, offsetRight]
}

export { getHorizontalOffsets }
/* eslint-disable no-undef */
const createHTMLMapMarker = ({ latlng, html, map }) => {
  class HTMLMapMarker extends window.google.maps.OverlayView {
    // Remainder of class definition
    constructor() {
      super()
      this.latlng = latlng
      this.html = html
      this.setMap(map)
    }
    createDiv() {
      this.div = document.createElement('div')
      this.div.style.position = 'absolute'
      if (this.html) {
        this.div.innerHTML = this.html
      }
      google.maps.event.addDomListener(this.div, 'click', event => {
        google.maps.event.trigger(this, 'click')
      })
    }

    appendDivToOverlay() {
      const panes = this.getPanes()
      panes.overlayLayer.appendChild(this.div)
    }

    positionDiv() {
      const point = this.getProjection().fromLatLngToDivPixel(this.latlng)
      if (point) {
        this.div.style.left = `${point.x}px`
        this.div.style.top = `${point.y}px`
      }
    }

    draw() {
      if (!this.div) {
        this.createDiv()
        this.appendDivToOverlay()
      }
      this.positionDiv()
    }

    remove() {
      if (this.div) {
        this.div.parentNode.removeChild(this.div)
        this.div = null
      }
    }

    getPosition() {
      return this.latlng
    }

    getDraggable() {
      return false
    }
  }

  return new HTMLMapMarker()
}

export default createHTMLMapMarker

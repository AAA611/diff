class Collector {
  constructor() {
    this.info = {}
  }
  collect(type, info) {
    if (!this.info[type]) {
      this.info[type] = []
    }
    console.log(type)
    this.info[type].push(info)
  }
  print() {
    console.log('[ collector info: ] >', JSON.stringify(this.info))
  }
}

export default Collector

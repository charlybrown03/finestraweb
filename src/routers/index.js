import FormRouter from './FormRouter'
import GuestsRouter from './GuestsRouter'

module.exports = () => {
  return {
    Form: new FormRouter(),
    Guests: new GuestsRouter()
  }
}

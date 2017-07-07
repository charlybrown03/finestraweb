import CommentsRouter from './CommentsRouter'
import FormRouter from './FormRouter'
import GuestsRouter from './GuestsRouter'

module.exports = () => {
  return {
    Comments: new CommentsRouter(),
    Form: new FormRouter(),
    Guests: new GuestsRouter()
  }
}

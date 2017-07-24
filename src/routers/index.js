import CommentsRouter from './CommentsRouter'
import FormRouter from './FormRouter'
import GuestsRouter from './GuestsRouter'
import SummaryRouter from './SummaryRouter'

module.exports = () => {
  return {
    Comments: new CommentsRouter(),
    Form: new FormRouter(),
    Guests: new GuestsRouter(),
    Summary: new SummaryRouter()
  }
}

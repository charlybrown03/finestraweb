import moment from 'moment'

import BaseModel from './BaseModel'

const CommentModel = BaseModel.extend({

  endpoint: 'comment',

  parse (obj) {
    obj.created_at = moment(obj.created_at).format('YYYY-MM-DD')
    return obj
  }

})

export default CommentModel

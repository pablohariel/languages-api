import Idiom from '@models/Idiom'
import WordView from './WordView'
import SubjectView from './SubjectView'

export default {
  render (idiom: Idiom) {
    return {
      id: idiom.id,
      name: idiom.name,
      size: idiom.size,
      subjects: SubjectView.renderMany(idiom.subjects),
      words: WordView.renderMany(idiom.words)
    }
  },
  renderMany (idioms: Idiom[]) {
    return idioms.map(idiom => this.render(idiom))
  }
}

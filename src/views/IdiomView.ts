import Idiom from '@models/Idiom'
import WordView from './WordView'

export default {
  render (idiom: Idiom) {
    return {
      id: idiom.id,
      name: idiom.name,
      size: idiom.size,
      subjects: idiom.subjects && idiom.subjects.map(subject => {
        return {
          id: subject.id,
          name: subject.name,
          description: subject.description,
          words: WordView.renderMany(subject.words)
        }
      }),
      words: idiom.words && WordView.renderMany(idiom.words)
    }
  },
  renderMany (idioms: Idiom[]) {
    return idioms.map(idiom => this.render(idiom))
  }
}

import Subject from '@models/Subject'
import WordView from './WordView'

export default {
  render (subject: Subject) {
    return {
      id: subject.id,
      name: subject.name,
      description: subject.description,
      words: subject.words && WordView.renderMany(subject.words),
      idiom: {
        id: subject.idiom.id,
        name: subject.idiom.name,
        size: subject.idiom.size
      }
    }
  },
  renderMany (subjects: Subject[]) {
    return subjects.map(subject => this.render(subject))
  }
}

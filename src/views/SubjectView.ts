import Subject from '@models/Subject'
import WordView from './WordView'
import IdiomView from './IdiomView'

export default {
  render (subject: Subject) {
    return {
      id: subject.id,
      name: subject.name,
      description: subject.description,
      idiom: IdiomView.render(subject.idiom),
      words: WordView.renderMany(subject.words)
    }
  },
  renderMany (subjects: Subject[]) {
    return subjects.map(subject => this.render(subject))
  }
}

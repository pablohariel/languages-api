import Word from '@models/Word'
import SubjectView from './SubjectView'
import IdiomView from './IdiomView'

export default {
  render (word: Word) {
    return {
      id: word.id,
      name: word.name,
      phrases: word.phrases,
      subject: SubjectView.render(word.subject),
      idiom: IdiomView.render(word.idiom)
    }
  },
  renderMany (words: Word[]) {
    return words.map(word => this.render(word))
  }
}

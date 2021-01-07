import Word from '@models/Word'

export default {
  render (word: Word) {
    return {
      id: word.id,
      name: word.name,
      phrases: word.phrases.split(', ')
    }
  },
  renderMany (words: Word[]) {
    return words.map(word => this.render(word))
  }
}

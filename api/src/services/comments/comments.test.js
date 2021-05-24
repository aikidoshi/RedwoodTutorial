// api/src/services/comments/comments.test.js

import { comments, createComment } from './comments'

describe('comments', () => {
  scenario('returns a list of comments', async (scenario) => {
    const list = await comments()

    expect(list.length).toEqual(Object.keys(scenario.comment).length)
  })

  scenario(
    'returns all comments for a single post from the database',
    async (scenario) => {
      const result = await comments({ postId: scenario.comment.jane.postId })
      expect(result.length).toEqual(1)
    }
  )

  scenario('postOnly', 'creates a new comment', async (scenario) => {
    const comment = await createComment({
      input: {
        name: 'Billy Bob',
        body: 'What is your favorite tree bark?',
        postId: scenario.post.bark.id,
      },
    })

    expect(comment.name).toEqual('Billy Bob')
    expect(comment.body).toEqual('What is your favorite tree bark?')
    expect(comment.postId).toEqual(scenario.post.bark.id)
    expect(comment.createdAt).not.toEqual(null)
  })
})

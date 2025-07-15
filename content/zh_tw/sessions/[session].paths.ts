import { pretalxClient } from '#loaders/pretalx'

export default {
  async paths() {
    const submissions = await pretalxClient.getAllSubmissions()

    return submissions.map((submission) => ({
      params: { session: submission.code },
    }))
  },
}

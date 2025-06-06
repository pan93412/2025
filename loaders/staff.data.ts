import { defineLoader } from 'vitepress'
import { conference } from '../data/conference'

interface StaffMember {
  name: string
  email_hash: string
}

interface StaffGroup {
  name: string
  tid: string
  chiefs: StaffMember[]
  members: StaffMember[]
  group: string
}

interface JoinUs {
  title: string
  description: string
}

interface StaffData {
  staffData: StaffGroup[]
  joinus: JoinUs
}

async function fetchStaffData(): Promise<StaffGroup[]> {
  const response = await fetch(`https://volunteer.coscup.org/api/members?pid=${conference.year}`)
  const json = await response.json()

  return json.data.map((group: any) => {
    const chiefs: StaffMember[] = group.chiefs
    const members: StaffMember[] = group.members

    const chiefEmails = new Set(chiefs.map((c) => c.email_hash))
    const emailToMember = new Map(members.map((m) => [m.email_hash, m]))

    const sortedChiefsInMembers = chiefs
      .map((c) => emailToMember.get(c.email_hash))
      .filter((m): m is StaffMember => !!m)

    const remainingMembers = members.filter((m) => !chiefEmails.has(m.email_hash))

    return {
      ...group,
      group: group.name.replace(/-.*$/, ''),
      members: [...sortedChiefsInMembers, ...remainingMembers],
    }
  })
}

export declare const data: StaffData

export default defineLoader({
  async load(): Promise<StaffData> {
    const staffData = await fetchStaffData()
    const joinus: JoinUs = {
      title: '歡迎加入志工團隊',
      description: `
        <p>每一次的活動都需要志工夥伴貢獻專長來讓活動順利進行，如果對 COSCUP 有服務的熱誠，歡迎來<a href="https://volunteer.coscup.org" target="_blank">報名加入志工</a></p>
      `,
    }
    return { staffData, joinus }
  },
})

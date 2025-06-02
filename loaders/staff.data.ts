import { conference } from '#data/conference'
import { defineLoader } from 'vitepress'

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

interface StaffData {
  staffData: StaffGroup[]
}

async function fetchStaffData(): Promise<StaffGroup[]> {
  const response = await fetch(`https://volunteer.coscup.org/api/members?pid=${conference.year}`)
  const json = await response.json()

  return json.data.map((staff: any) => ({
    ...staff,
    group: staff.name.replace(/-.*$/, ''),
  }))
}

export declare const data: StaffData

export default defineLoader({
  async load(): Promise<StaffData> {
    const staffData = await fetchStaffData()
    return { staffData }
  },
})

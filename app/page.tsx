import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import {
  InvitationExperience,
  type GuestInvitation,
} from '@/components/invitation/invitation-experience'

interface PageProps {
  searchParams: Promise<{ id?: string | string[] }>
}

function parseCsvRow(line: string) {
  const fields: string[] = []
  let field = ''
  let insideQuotes = false

  for (let index = 0; index < line.length; index += 1) {
    const character = line[index]
    if (character === '"') {
      if (insideQuotes && line[index + 1] === '"') {
        field += '"'
        index += 1
      } else {
        insideQuotes = !insideQuotes
      }
    } else if (character === ',' && !insideQuotes) {
      fields.push(field)
      field = ''
    } else {
      field += character
    }
  }

  fields.push(field)
  return fields
}

async function findGuest(id: string | undefined): Promise<GuestInvitation | null> {
  if (!id || !/^[A-Za-z0-9]{16}$/.test(id)) return null

  const csv = await readFile(
    join(process.cwd(), 'data', 'invitados-unificados.csv'),
    'utf8',
  )
  const rows = csv.split(/\r?\n/).filter(Boolean).slice(1)

  for (const row of rows) {
    const [guestId, name, quantity] = parseCsvRow(row)
    if (guestId === id && name && quantity) {
      return { name, quantity }
    }
  }

  return null
}

export default async function Page({ searchParams }: PageProps) {
  const { id } = await searchParams
  const guestId = Array.isArray(id) ? id[0] : id
  const guest = await findGuest(guestId)

  return <InvitationExperience guest={guest} />
}

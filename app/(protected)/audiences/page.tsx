'use client'

import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import { AudienceCard } from './components/AudienceCard'
import CustomSearch from '@/components/custom/CustomSearch'
import { AddAudience } from './components/CreateAudience'
import { getAudiences } from '@/app/actions/audienceActions/audience'
import { useEffect, useState } from 'react'

export type AudienceType = {
  id: string
  userId: number
  name: string
  description: string
  subscriber_count: number
  created_at: Date
  updated_at: Date
}

const Page = () => {
  const [audiences, setAudiences] = useState<AudienceType[]>([])
  const [allAudiences, setAllAudiences] = useState<AudienceType[]>([])

  const fetchAudiences = async () => {
    const { audiences: data } = (await getAudiences()) || {}
    setAudiences(data || [])
    setAllAudiences(data || [])
  }

  useEffect(() => {
    fetchAudiences()
  }, [])

  const setAudienceSmart = (input: AudienceType | AudienceType[]) => {
    setAudiences(prev => {
      const updates = Array.isArray(input) ? input : [input]
      const map = new Map(prev.map(a => [a.id, a]))

      for (const audience of updates) {
        map.set(audience.id, audience)
      }

      return Array.from(map.values())
    })

    // keep source list in sync
    setAllAudiences(prev => {
      const updates = Array.isArray(input) ? input : [input]
      const map = new Map(prev.map(a => [a.id, a]))

      for (const audience of updates) {
        map.set(audience.id, audience)
      }

      return Array.from(map.values())
    })
  }

  return (
    <Container>
      <HeadingPair
        heading="Audiences"
        subheading="Create and manage audiences that suit your needs"
      />

      <section className="w-full flex justify-between">
        <CustomSearch
          searchField="name"
          placeholder="Search Audiences"
          sourceItems={allAudiences}
          setFilteredItems={setAudiences}
        />

        <AddAudience setItem={setAudienceSmart} />
      </section>

      <section className="flex flex-wrap gap-6 items-stretch">
        {audiences.map(item => (
          <AudienceCard
            key={item.id}
            item={item}
            setAudiences={setAudienceSmart}
          />
        ))}
      </section>
    </Container>
  )
}

export default Page

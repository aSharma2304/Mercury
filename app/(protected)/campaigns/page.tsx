import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import {Button} from "@/components/ui/button"
import Link from 'next/link'
import CampaignForm from './_components/CampaignForm'

const page = () => {
  return (

    <Container>
      <HeadingPair heading='Campaigns' subheading='Make use of your created audiences and mails to run campaigns'/>
      <div className='flex justify-end w-full'>
        <CampaignForm/>
      </div>
    </Container>
  )
}

export default page
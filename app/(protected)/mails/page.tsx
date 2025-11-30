import Container from '@/components/custom/Container'
import HeadingPair from '@/components/custom/HeadingPair'
import MailCard from './_components/MailCard'
import {Button} from "@/components/ui/button"
import Link from 'next/link'
import { getMails } from '@/app/actions/mailActions/mails'

const page = async () => {

  const {mails} = await getMails();

  return (
    <Container>
      <HeadingPair heading='Mails' subheading='Create your mail templates that suit your usecase'/>
      <div className='flex justify-end'><Link href={"/mails/create"}><Button variant={ 'outline'}>Create Template</Button></Link></div>
    <section className='w-full flex flex-wrap gap-4'>
      {mails?.map((mail)=>{
        return <MailCard key={mail.id} mail={mail} />
      })}
    </section>
    </Container>
  )
}

export default page
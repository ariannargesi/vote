import FullScreen from '@/components/full-screen'
import { Header, Content, Page } from '../pages/cmp'
import { CaretDownFill, CaretUpFill, GearWideConnected, Pen } from 'react-bootstrap-icons'
import Image from 'next/image'
import Button from '@/components/Button'
import Link from 'next/link'
import EditProfile from '../app/edit-profile/edit-profile'
import { useRouter } from 'next/router'

export default function Profile() {
    const router = useRouter()

    function goToEdit () {
        router.push('/edit-profile')    
    }

    return (
        <Page>
            <style jsx>{`
                 .ss {
                    background-color: #dcfce7;
                    background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #dcfce7 18px ), repeating-linear-gradient( #ffffff55, #ffffff );
                }
                
                .bb {
                    background-color: #fef08a;
                    background-image:  repeating-radial-gradient( circle at 0 0, transparent 0, #fef08a 18px ), repeating-linear-gradient( #ffffff55, #ffffff );
                }
            `}</style>

            <Header extraClasses='flex items-center justify-between'>
                <h1 className="text-xl font-bold">پروفایل من</h1>
                <FullScreen />
            </Header>
            <Content>
                <div className="flex flex-col gap-y-5">
                    <div>
                        <div className='flex gap-x-3 items-center'>
                            <Image
                                className='rounded-full'
                                src={'https://picsum.photos/80'}
                                width={80} height={80} alt='your pic'
                            />
                            <div className='w-full'>
                                <span className='font-bold text-lg'>الهام رضا ناصری</span>
                                <br />
                                <p>سلام خدمت دوستان. آرین حسن‌زاده هستم برنامه نویس و توسعه دهنده نرم‌ٔآفزار. امیدوارم در کنار همدیگه یاد بگیریم تا بتونیم جامعه بهتری بسازیم</p>
                            </div>
                        </div>
                        <Button outline full extendClass='mt-4' onClick={goToEdit} >ویرایش </Button>
                    </div>
                    <div className='flex gap-x-3'>
                        <div className='rounded-md p-5 ss'>
                            <div className='flex justify-between text-gray-500'>
                                <span className='text-2xl'>امتیاز: </span>
                                <span className="text-3xl font-bold mr-3 blcok">۳۴۵+</span>
                            </div>
                            <div className='flex justify-around'>
                                <div className='text-green-500'>
                                    <CaretUpFill fontSize={32} />
                                    <span className='text-xl'>۴۰۰+</span>
                                </div>
                                <div className='text-red-500'>
                                    <CaretDownFill fontSize={32} />
                                    <span className='text-xl'>۵۵-</span>
                                </div>
                            </div>
                        </div>
                        <div className='rounded-md p-5 bb'>
                            <div className='text-gray-500 flex flex-col'>
                                <span className='text-2xl w-2/3'>رای‌گیری های من</span>
                                <br />
                                <span className='text-3xl font-bold text-center'>۳۲</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button color='danger' outline>خروج از حساب</Button>
                    </div>
                </div>
            </Content>
        </Page>
    )
}
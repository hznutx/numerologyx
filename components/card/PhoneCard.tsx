import {Image} from '@nextui-org/react';
import {cn} from '@nextui-org/theme';

export interface IPhoneData {
  phone: string;
  network: string;
  price: number;
  result: number;
  available: boolean;
  rank: string;
}

interface IPhoneCard {
  data: IPhoneData;
}

const networkType = (type: string) => {
  switch (type) {
    case 'DTAC':
      return 'https://img5.pic.in.th/file/secure-sv1/15873930757737-1.md.png';
    case 'TRUE':
      return 'https://img2.pic.in.th/pic/w_true.md.png';
    case 'AIS':
      return 'https://img5.pic.in.th/file/secure-sv1/09_AISdonation.md.jpg';

    default:
      return '';
  }
};

const PhoneCard: React.FC<IPhoneCard> = ({data}) => {
  return (
    <div className='block'>
      <div className={cn('flex h-20 w-72 cursor-pointer items-center justify-start rounded-2xl border border-transparent bg-neutral-100 backdrop-blur-[10px] transition duration-150 ease-in-out hover:scale-105 hover:border-neutral-500/20 dark:bg-neutral-800')}>
        <Image
          src={`${networkType(data.network)}`}
          alt='network'
          className='object-scale-down bg-white ml-[14px] h-[50px] w-[50px] rounded-[10px] '
        />
        <div className='ml-[10px] w-[calc(100%-90px)] text-neutral-700 dark:text-neutral-300'>
          <div className='flex items-center justify-between'>
            <div>
              <p className='font-bold text-lg'>{data?.phone}</p> <p className='line-clamp-2 font-light text-xs'>{data?.network}</p>
            </div>
            <div>
              <p className='text-center text-orange-500 text-xs'>
                <span className='text-xs text-neutral-400 dark:text-neutral-500 pr-1'>ผลรวม</span>
                {data?.result}
              </p>
              <p className='w-full text-right text-sm'>{data?.price.toLocaleString()} ฿</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneCard;

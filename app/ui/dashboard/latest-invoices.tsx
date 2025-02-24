import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices } from '@/app/lib/data';
import { formatDateToLocal } from '@/app/lib/utils';
export default async function LatestInvoices() {
  //   {
  //   latestInvoices,
  // }: {
  //   latestInvoices: LatestInvoice[];
  // }
  const latestInvoices = await fetchLatestInvoices();

  return (
    <div className='flex w-full flex-col md:col-span-4'>
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Latest Invoices
      </h2>
      <div className='flex grow flex-col justify-between rounded-xl bg-gray-50 p-4'>
        {/* NOTE: Uncomment this code in Chapter 7 */}

        <div className='bg-white px-6'>
          {latestInvoices.map((invoice, i) => {
            return (
              <div
                key={invoice.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  }
                )}
              >
                <div className='flex items-center'>
                  <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className='rounded-full mr-4'
                    width={40}
                    height={40}
                  />
                  <div className='min-w-max'>
                    <div className='flex items-center'>
                      <p className='truncate text-sm font-semibold md:text-base'>
                        {invoice.name}
                      </p>
                      <p className='hidden text-[10px] ml-5 text-gray-500 sm:block'>
                        {formatDateToLocal(invoice.date)}
                      </p>
                    </div>
                    <p className='hidden text-sm text-gray-500 sm:block'>
                      {invoice.email}
                    </p>
                  </div>
                </div>
                <p
                  className={clsx(
                    `${lusitana.className} truncate font-medium text-lg`,
                    {
                      'text-red-600': invoice.status === 'pending',
                      'text-green-600': invoice.status === 'paid',
                    }
                  )}
                >
                  {invoice.amount}
                </p>
              </div>
            );
          })}
        </div>
        <div className='flex items-center pb-2 pt-6'>
          <ArrowPathIcon className='h-5 w-5 text-gray-500' />
          <h3 className='ml-2 text-sm text-gray-500 '>Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

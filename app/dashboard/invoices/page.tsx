import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchInvoicesPages } from '@/app/lib/data';

// export default async function Page(props: {
//   searchParams?: Promise<{
//     query?: string;
//     page?: string;
//   }>;
// }) {
//   const searchParams = await props.searchParams;
//   const query = searchParams?.query || '';
//   const currentPage = Number(searchParams?.page) || 1;

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const query = (await searchParams)?.query || '';
  const currentPage = Number((await searchParams)?.page);
  const totalPages = await fetchInvoicesPages(query);

  return (
    <div className='w-full flex flex-col h-full py-6 md:py-12'>
      <div className='w-full items-center justify-between px-6 md:px-12'>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          Invoices
        </h1>
      </div>
      <div className='flex items-center justify-between gap-2 px-6 md:px-12'>
        <Search placeholder='Search invoices...' />
        <CreateInvoice />
      </div>
      <div className={'my-6 px-6 md:px-12 flex-col flex-1 overflow-auto'}>
        <Suspense
          key={query + currentPage}
          fallback={<InvoicesTableSkeleton />}
        >
          <Table query={query} currentPage={currentPage} />
        </Suspense>
      </div>
      <div className='mt-5 flex w-full justify-end px-6 md:px-12'>
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}

'use client';
interface Props {
  orders: Order[];
}

import formatDate from '@/utils/formatDate';
import { Button, Modal, Table } from 'antd';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ChangeDeliveryStatusTable from './ChangeDeliveryStatusTable';
import { Order } from '@/interfaces';
import { handleDelivery } from '@/actions';
import Cookies from 'universal-cookie';
export default function OrdersTable({ orders }: Props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Order | null>(null);
  const [columns, setColumns] = useState([
    {
      title: 'عملیات',
      dataIndex: '',
      align: 'center',
      key: '_id',
      render: (record: Order) => (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <Button
            onClick={() => {
              setSelectedRecord(record);
              setIsModalVisible(true);
            }}
          >
            بررسی سفارش
          </Button>
        </div>
      ),
    },
    {
      title: 'وضعیت تحویل',
      dataIndex: '',
      align: 'center',
      key: 'deliveryStatus',
      render: (record: Order) =>
        record.deliveryStatus ? (
          <span>تحویل داده شده</span>
        ) : (
          <span>در انتظار ارسال</span>
        ),
      filters: [
        { text: 'تحویل داده شده', value: true },
        { text: 'در انتظار ارسال', value: false },
      ],
      onFilter: (value: any, record: Order) => {
        return record.deliveryStatus === value;
      },
    },
    {
      title: ' زمان ثبت سفارش',
      align: 'center',
      dataIndex: '',
      key: 'createdAt',
      render: (record: Order) => {
        const dateValue = formatDate(record.createdAt);
        return <span>{dateValue}</span>;
      },
    },
    {
      title: 'مجموع مبلغ(تومان)',
      align: 'center',
      dataIndex: 'totalPrice',
    },
    {
      title: 'نام کاربر',
      align: 'center',
      dataIndex: '',
      key: 'user',
      render: (record: Order) => <span>{record.user.username}</span>,
    },
  ]);
  const [dataSource, setDataSource] = useState(
    orders && Array.isArray(orders) ? orders : []
  );
  useEffect(() => {
    setDataSource(orders);
    setIsModalVisible(false);
  }, [orders]);
  return (
    <div dir="ltr">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{
          pageSize: 3,
          total: orders.length,
          // showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} items`,
        }}
      />
      <Modal
        title="جزئیات سفارش"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedRecord && (
          <div className="pr-2 flex flex-col item-center justify-center gap-2">
            <p>
              نام مشتری : {selectedRecord.user.firstname}{' '}
              {selectedRecord.user.lastname}
            </p>
            {/* <p>نام خانوادگی : {selectedRecord.user.lastname}</p> */}
            <p> تلفن : {selectedRecord.user.phoneNumber}</p>
            <p> آدرس : {selectedRecord.user.address}</p>
            <p>زمان سفارش: {formatDate(selectedRecord.createdAt)}</p>
            <p>زمان تحویل : {formatDate(selectedRecord.deliveryDate)}</p>
            <div>
              <ChangeDeliveryStatusTable order={selectedRecord} />
              {/* {selectedRecord.products.map(
                (pro) => pro.product && <p key={pro._id}>{pro.product.name}</p>
              )} */}
            </div>
            {selectedRecord.deliveryStatus ? (
              <p>وضعیت تحویل: تحویل داده شده</p>
            ) : (
              <form
                action={() => {
                  const cookies = new Cookies();
                  const accessToken = cookies.get('accessToken');
                  return handleDelivery(selectedRecord, accessToken);
                }}
              >
                <Button htmlType="submit">ارسال شد</Button>
              </form>
            )}
            {/* <p>
              وضعیت تحویل:{' '}
              {selectedRecord.deliveryStatus ? 'تحویل داده شده' : ''}
            </p> */}
          </div>
        )}
      </Modal>
    </div>
  );
}

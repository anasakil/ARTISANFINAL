import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Layout, Tag } from 'antd';
import Sidebar from './Sidebar'; // Ensure this imports correctly
import { fetchSubscriptions } from '../../features/users/usersSlice';
import PageHeader from './Header';

const { Content } = Layout;

const columns = [
  // {
  //   title: 'Subscription ID',
  //   dataIndex: '_id',
  //   key: '_id',
  //   responsive: ['md'] 
  // },
  {
    title: 'Seller Name',
    dataIndex: 'sellerName',
    key: 'sellerName',
    responsive: ['sm'] 
  },
  {
    title: 'Plan',
    dataIndex: 'plan',
    key: 'plan',
    responsive: ['sm'],
    render: plan => {
      let color = 'gold';
      if (plan === 'pro') {
        color = 'volcano';
      }
      return (
        <Tag color={color} key={plan}>
          {plan.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    responsive: ['sm'],
    render: status => {
      let color = 'green';
      if (status === 'inactive') {
        color = 'red';
      } else if (status === 'cancelled') {
        color = 'orange';
      }
      return (
        <Tag color={color} key={status}>
          {status.toUpperCase()}
        </Tag>
      );
    }
  },
  {
    title: 'Start Date',
    dataIndex: 'startDate',
    key: 'startDate',
    render: text => new Date(text).toLocaleDateString(),
    responsive: ['sm'] // Consider hiding on very small screens
  },
  {
    title: 'End Date',
    dataIndex: 'endDate',
    key: 'endDate',
    render: text => new Date(text).toLocaleDateString(),
    responsive: ['sm'] // Consider hiding on very small screens
  }
];

const SellerManagement = () => {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const subscriptions = useSelector(state => state.users.subscriptions || []);
  const loading = useSelector(state => state.users.loading);

  useEffect(() => {
    dispatch(fetchSubscriptions());
  }, [dispatch]);

  const tableData = Array.isArray(subscriptions) ? subscriptions : [];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
      <Layout>
        <PageHeader/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff' }}>
            <Table
              columns={columns}
              dataSource={tableData}
              loading={loading}
              rowKey="_id"
              scroll={{ x: 800 }}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SellerManagement;










// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Table, Layout, Tag } from 'antd';
// import Sidebar from './Sidebar'; // Make sure this is correctly imported
// import { fetchSubscriptions } from '../../features/users/usersSlice';
// import { useMediaQuery } from 'react-responsive'; // This needs to be installed or implemented

// const { Content } = Layout;

// const columns = [
//   {
//     title: 'Subscription ID',
//     dataIndex: '_id',
//     key: '_id',
//     responsive: ['md'] // Display on medium and larger screens only
//   },
//   {
//     title: 'Seller Name',
//     dataIndex: 'sellerName',
//     key: 'sellerName',
//     responsive: ['sm'] // Display on small and larger screens
//   },
//   {
//     title: 'Plan',
//     dataIndex: 'plan',
//     key: 'plan',
//     responsive: ['sm'],
//     render: plan => {
//       let color = 'gold';
//       if (plan === 'pro') {
//         color = 'volcano';
//       }
//       return (
//         <Tag color={color} key={plan}>
//           {plan.toUpperCase()}
//         </Tag>
//       );
//     }
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//     responsive: ['sm'],
//     render: status => {
//       let color = 'green';
//       if (status === 'inactive') {
//         color = 'red';
//       } else if (status === 'cancelled') {
//         color = 'orange';
//       }
//       return (
//         <Tag color={color} key={status}>
//           {status.toUpperCase()}
//         </Tag>
//       );
//     }
//   },
//   {
//     title: 'Start Date',
//     dataIndex: 'startDate',
//     key: 'startDate',
//     render: text => new Date(text).toLocaleDateString(),
//     responsive: ['sm'] // Consider hiding on very small screens
//   },
//   {
//     title: 'End Date',
//     dataIndex: 'endDate',
//     key: 'endDate',
//     render: text => new Date(text).toLocaleDateString(),
//     responsive: ['sm'] // Consider hiding on very small screens
//   }
// ];

// const SellerManagement = () => {
//   const [collapsed, setCollapsed] = useState(false);
//   const dispatch = useDispatch();
//   const subscriptions = useSelector(state => state.users.subscriptions || []);
//   const loading = useSelector(state => state.users.loading);
//   const isMobile = useMediaQuery({ query: '(max-width: 576px)' });

//   useEffect(() => {
//     dispatch(fetchSubscriptions());
//   }, [dispatch]);

//   const tableData = Array.isArray(subscriptions) ? subscriptions : [];

//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />
//       <Layout>
//         <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
//           <div style={{ padding: 24, background: '#fff' }}>
//             {isMobile ? (
//               // Optional: Implement a custom mobile component for better mobile UX
//               <MobileSellerList data={tableData} />
//             ) : (
//               <Table
//                 columns={columns}
//                 dataSource={tableData}
//                 loading={loading}
//                 rowKey="_id"
//                 scroll={{ x: 'max-content' }}
//               />
//             )}
//           </div>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// // Example of a MobileSellerList component for mobile-friendly view
// const MobileSellerList = ({ data }) => (
//   <div>
//     {data.map(item => (
//       <div key={item._id} style={{ padding: '10px', borderBottom: '1px solid #ccc' }}>
//         <p><strong>ID:</strong> {item._id}</p>
//         <p><strong>Name:</strong> {item.sellerName}</p>
//         <p><strong>Plan:</strong> {item.plan}</p>
//         <p><strong>Status:</strong> {item.status}</p>
//         <p><strong>Start:</strong> {new Date(item.startDate).toLocaleDateString()}</p>
//         <p><strong>End:</strong> {new Date(item.endDate).toLocaleDateString()}</p>
//       </div>
//     ))}
//   </div>
// );

// export default SellerManagement;


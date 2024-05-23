
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllCategories, createNewCategory, updateExistingCategory, removeCategory } from '../../features/categories/categoriesSlice';
import { Layout, Table, Button, Input, Modal, Form, message } from 'antd';
import Sidebar from './Sidebar.js';
import PageHeader from './Header.jsx';

const { Content } = Layout;

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const [collapsed, setCollapsed] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  const handleCreateCategory = () => {
    if (newCategoryName.trim() !== '') {
      dispatch(createNewCategory({ name: newCategoryName }))
        .then(() => {
          message.success('Category created successfully');
          setNewCategoryName('');
        })
        .catch(error => {
          message.error('Failed to create category');
        });
    }
  };

  const handleEditCategory = (categoryId, categoryName) => {
    setEditCategoryId(categoryId);
    setEditCategoryName(categoryName);
    setIsModalVisible(true);
  };

  const handleUpdateCategory = () => {
    if (editCategoryName.trim() !== '') {
      dispatch(updateExistingCategory({ id: editCategoryId, name: editCategoryName }))
        .then(() => {
          message.success('Category updated successfully');
          setIsModalVisible(false);
          setEditCategoryId(null);
          setEditCategoryName('');
          dispatch(fetchAllCategories());

        })
        .catch(error => {
          message.error('Failed to update category');
        });
    }
  };

  const handleDeleteCategory = (categoryId) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this category?',
      content: 'This action cannot be undone and will delete all related data.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        dispatch(removeCategory(categoryId))
          .then(() => {
            message.success('Category deleted successfully');
            dispatch(fetchAllCategories());

          })
          .catch(error => {
            message.error('Failed to delete category');
          });

      }
    });
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEditCategory(record._id, record.name)}>Edit</Button>
          <Button danger onClick={() => handleDeleteCategory(record._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}> 
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} />

      <Layout style={{ minHeight: '100vh' }}>
       <PageHeader/>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial', minHeight: '280px' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 'calc(100vh - 96px)' }}>
            <h2>Category Management</h2>
            <Form layout="inline" onFinish={handleCreateCategory}>
              <Form.Item>
                <Input
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">Create</Button>
              </Form.Item>
            </Form>
            <Table dataSource={categories} columns={columns} rowKey="_id" />
            <Modal title="Edit Category" open={isModalVisible} onCancel={() => setIsModalVisible(false)} onOk={handleUpdateCategory}>
              <Input value={editCategoryName} onChange={(e) => setEditCategoryName(e.target.value)} placeholder="Enter category name" />
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default CategoryManagement;

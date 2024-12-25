import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Button, Checkbox, Drawer, Form, Input, InputNumber, message, Popconfirm, Table} from 'antd';
import React, {  useState } from 'react';

import {useDispatch,  useSelector} from 'react-redux';
import { updatequantity,clearcart ,removefromcart} from '../reduxtoolkit/Slice';



function AppCart() {
    const [form] = Form.useForm()
   const dispatch =  useDispatch()
   
    const [cartdraweropen , setCartdraweropen] = useState(false);
    const [checkoutcart ,setCheckOutCart] = useState(false)

    const cartitems = useSelector((state)=>state.productlists.cart)


const handlequantitychange = (value,record)=>{
    dispatch(updatequantity({id :record.id , quantity:value}))


}

const handleremovefromcart = (id)=>{
    dispatch(removefromcart(id))

}
const SubmitConfirmOrder = (values)=>{
    
    

    console.log({values});

    form.resetFields()
    dispatch(clearcart())
    setCartdraweropen(false)
    setCheckOutCart(false)
   
    message.success("Your order has been placed successfully.")

}


  return (
    <div>
      <Badge classNames='drawer'
      count= {cartitems.length} 
      onClick={()=>setCartdraweropen(true)} className='shoppingcarticon'>

      <ShoppingCartOutlined />
      </Badge>
      <Drawer open={cartdraweropen}
      onClose={()=>setCartdraweropen(false)}
      title = "Your Cart"
      contentWrapperStyle={{width: 550}}
      >

        <Table
        pagination ={false}
        columns={[
            {
                title: "Title",
                dataIndex:"title",
                key:"title"
            },
            {
                title: "Image",
                dataIndex:"img",
                key:"img",
                render:(img)=>{
                    return <img src={img} alt='product' style={{width:'60px' ,hight:'60px'}}></img>
                }
            },
            {
                title: "Price",
                dataIndex:"price",
                key:"price",
                render:(price) =>{
                    return <span>${(price).toFixed(2)}</span>
                }
            },
            {
                title: "Quantity",
                dataIndex:"quantity",
                key: "quantity",
                render:(quantity,record) =>{
                   return <InputNumber min={1} defaultValue={quantity || 1} onChange={(value)=>handlequantitychange(value,record)}/>
                },
               
            },{
                title: "Total",
                dataIndex:"total",
                key:"total",
                render:(text , record) =>{
                    const total = (record.price ||0) *(record.quantity ||0)
                    return <span>${total.toFixed(2)}</span>
                }
            },
            {
                title: "Action",
                dataIndex:"action",
                key:"action",
                render:(_, record)=>{
                    return <Popconfirm title="Are you sure to remove this product" 
                    okText ="Yes" 
                    cancelText = "No"
                    onConfirm={()=>handleremovefromcart(record.id)}
                    >
                        <Button>X</Button>

                    </Popconfirm>
                }
            }
            
        ]}
        dataSource={cartitems}
        // rowKey='id'
        summary={(data) =>{
            const total = data.reduce((pre , current)=>{
                const totalitem = (current.price ||0) *(current.quantity ||0)
                return pre + totalitem

            },0)
            return (
                <Table.Summary.Row>
                    <Table.Summary.Cell>
                        <strong>Total: ${total.toFixed(2)}</strong>
                    </Table.Summary.Cell>

                </Table.Summary.Row>
            )
            
        }}
        
        />
        <Button onClick={()=>setCheckOutCart(true)}  type='primary' disabled ={cartitems.length === 0}>Check Out Your Cart</Button>

    
      </Drawer>

      <Drawer open = {checkoutcart}
        onClose={()=>setCheckOutCart(false)}
        title = "Confirm Order">

        <Form form={form} onFinish={SubmitConfirmOrder}> 
            <Form.Item label ="Full Name" name = 'full name'>
                <Input type='text'  placeholder='Enter your full name' required/>
            </Form.Item>

            <Form.Item label ="Email" name = 'email'>
                <Input type='email'  placeholder='Enter your email' required/>
            </Form.Item>

            <Form.Item label ="Address" name = 'address'>
                <Input type='text'  placeholder='Enter your full name' required/>
            </Form.Item>

            <Form.Item>
                <Checkbox>Cash On Delivery</Checkbox>
            </Form.Item>
            <Button type='primary' htmlType='submit'>Confirm Order</Button>
        </Form>
        </Drawer>
    </div>
  );
}

export default AppCart;

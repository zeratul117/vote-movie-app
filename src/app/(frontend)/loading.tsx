import { Spin } from 'antd';

export default async function Loading() {

  return (
    <div className="p-10">
      <Spin size="large" />
    </div>
  )
}

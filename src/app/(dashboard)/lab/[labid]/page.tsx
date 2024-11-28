import React from 'react'

interface Props {
  params: {
    labid: string;
  };
}

const Page = ({ params }: Props) => {
  return <div>lab id {params.labid}</div>;
};

export default Page;

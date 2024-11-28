import React from 'react'

interface Props {
    params: {
        labid: string
    }
}

const page = (labid: Props) => {
  return (
    <div>lab id {labid.params.labid}</div>
  )
}

export default page
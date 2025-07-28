import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link'; 
import ResumeUploadDialog from './ResumeUploadDialog';

interface TOOL {
  name: string;
  desc: string;
  icon: string;
  button: string;
  path: string;
}

type AiToolProps = {
  tool: TOOL;
};

const AiToolCard = ({ tool }: AiToolProps) => {
  return (
    <div className=' p-3 bg-white border rounded-xl'>
      <Image src={tool.icon} alt={tool.name} width={40} height={40} />
      <h2 className='mt-2 font-medium'> {tool.name}</h2>
      <p className='text-gray-400'> {tool.desc}</p>
      <Link href={tool.path}> 
        <Button className='w-full mt-3 text-white'>{tool.button}</Button>
      </Link >
      <ResumeUploadDialog/>
    </div>
  );
};

export default AiToolCard;

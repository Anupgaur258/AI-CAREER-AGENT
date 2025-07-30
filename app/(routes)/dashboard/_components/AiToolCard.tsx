'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ResumeUploadDialog from './ResumeUploadDialog';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';
import axios from 'axios';

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
  const id = uuidv4();
  const { user } = useUser();
  const { getToken } = useAuth();
  const router = useRouter();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);

  const onClickButton = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    if (tool.name === 'Ai Resume Analyzer') {
      setOpenResumeUpload(true);
      return;
    }

    try {
      const token = await getToken();
      const result = await axios.post(
        '/api/history',
        {
          recordId: id,
          content: [],
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(result);
      router.push(`${tool.path}/${id}`);
    } catch (error) {
      console.error('Failed to create history:', error);
    }
  };

  return (
    <div className='p-3 bg-white border rounded-xl'>
      <Image src={tool.icon} alt={tool.name} width={40} height={40} />
      <h2 className='mt-2 font-medium'>{tool.name}</h2>
      <p className='text-gray-400'>{tool.desc}</p>
      <Button className='w-full mt-3 text-white' onClick={onClickButton}>
        {tool.button}
      </Button>
      <ResumeUploadDialog
        openResumeUpload={openResumeUpload}
        setOpenResumeDialog={setOpenResumeUpload}
      />
    </div>
  );
};

export default AiToolCard;
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { v4 as uuidv4 } from 'uuid';
import { Sparkles } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

interface ResumeUploadDialogProps {
  openResumeUpload: boolean;
  setOpenResumeDialog: (open: boolean) => void;
}

const ResumeUploadDialog = ({
  openResumeUpload,
  setOpenResumeDialog,
}: ResumeUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const { getToken } = useAuth();

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const onUploadAndAnalyze = async () => {
    if (!file) return;

    const recordId = uuidv4();
    const formdata = new FormData();
    formdata.append('recordId', recordId);
    formdata.append('resumeFile', file);

    try {
      const token = await getToken();
      const response = await axios.post('/api/history', formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Upload response:', response.data);
      router.push(`/ai-resume-analyzer/${recordId}`);
      setOpenResumeDialog(false);
    } catch (error) {
      console.error('Failed to upload resume:', error);
    }
  };

  return (
    <Dialog open={openResumeUpload} onOpenChange={setOpenResumeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Your Resume PDF</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center flex-col border p-7 border-dashed hover:bg-slate-100 rounded-xl cursor-pointer">
          <label htmlFor="resumeUpload">
            {file ? (
              <h2 className="mt-3 text-blue-600">{file.name}</h2>
            ) : (
              <h2 className="mt-3">Click here to upload PDF file</h2>
            )}
          </label>
          <input
            type="file"
            id="resumeUpload"
            className="hidden"
            accept=".pdf"
            onChange={onFileChange}
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpenResumeDialog(false)}>
            Cancel
          </Button>
          <Button disabled={!file} onClick={onUploadAndAnalyze}>
            <Sparkles className="mr-2 h-4 w-4" />
            Upload & Analyze
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeUploadDialog;
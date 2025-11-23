'use client'
import { useEffect, useRef } from 'react';
import BeefreeSDK from '@beefree.io/sdk';

export default function BeefreeEditor() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function initializeEditor() {
      const beeConfig = {
        container: 'beefree-react-demo',
        language: 'en-US',
        onSave: (pageJson: string, pageHtml: string, ampHtml: string | null, templateVersion: number, language: string | null) => {
          console.log('Saved!', { pageJson, pageHtml, ampHtml, templateVersion, language });
        },
        onError: (error: unknown) => {
          console.error('Error:', error);
        }
      };

      const response = await fetch('http://localhost:4000/api/beefree', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uid: 'demo-user' })
      })
    
      const token = await response.json();
      console.log("token",token);

      const bee = new BeefreeSDK(token.token);
      console.log("bee",bee)
      bee.start(beeConfig, {});
    }

    initializeEditor();
  }, []);

  return (
    <div className='w-full flex p-4 rounded-md '>
      <div
        id="beefree-react-demo"
        ref={containerRef}
        className='h-full w-[70%]  '
      />
    </div>
  );
}
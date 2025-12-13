'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export interface FormStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  isActive: boolean;
}

export function FormStep({ title, description, children, isActive }: FormStepProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card variant="elevated">
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-6">
              {children}
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

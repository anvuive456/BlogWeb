'use client';

import React from 'react';
import {
  CommentResolveButton as CommentResolveButtonPrimitive,
  useComment,
} from '@udecode/plate-comments';

import { cn } from '@an/lib/utils';
import { Icons } from '@an/components/icons';
import { buttonVariants } from '@an/components/plate-ui/button';

export function CommentResolveButton() {
  const comment = useComment()!;

  return (
    <CommentResolveButtonPrimitive
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'h-6 p-1 text-muted-foreground'
      )}
    >
      {comment.isResolved ? (
        <Icons.refresh className="h-4 w-4" />
      ) : (
        <Icons.check className="h-4 w-4" />
      )}
    </CommentResolveButtonPrimitive>
  );
}

import { Button } from '@/src/components/ui/button';
import { RiLinkedinFill, RiGithubFill, RiMailFill } from '@remixicon/react';

export default function SocialLinks() {
  return (
    <div className="fixed top-4 right-4 bg-transparent z-20 inline-flex flex-wrap gap-2">
      <Button variant="outline" aria-label="View LinkedIn Profile" size="icon">
        <RiLinkedinFill size={16} aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="View GitHub Profile" size="icon">
        <RiGithubFill size={16} aria-hidden="true" />
      </Button>
      <Button variant="outline" aria-label="Contact via Email" size="icon">
        <RiMailFill size={16} aria-hidden="true" />
      </Button>
    </div>
  );
}

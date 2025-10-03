import { Button } from '@/components/ui/button';
import { isRouteErrorResponse, Link, useRouteError } from 'react-router';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <h1 className="text-9xl font-bold text-primary">{error.status}</h1>
        <p className="text-2xl text-muted-foreground">{error.statusText}</p>
        {error.status === 404 && <p className="text-muted-foreground">Cette page n'existe pas</p>}
        <Button asChild className="mt-4">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Oops!</h1>
        <p className="mt-2 text-muted-foreground">Une erreur est survenue</p>
        <Button asChild className="mt-4">
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
}

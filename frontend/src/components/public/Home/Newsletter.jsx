import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Newsletter() 
{
  return (
    <section className='bg-gray-50 py-12'>
      <div className="container flex flex-col justify-center mx-auto">
        <div className="flex flex-col items-center text-center">
          <h3 className="mb-3 max-w-3xl text-2xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            Newsletter
          </h3>
          <p className="mb-8 max-w-3xl text-muted-foreground lg:text-lg">
            Inscrivez-vous à notre newsletter pour recevoir les dernières
            nouvelles et mises à jour.
          </p>
          <div className="w-full md:max-w-lg">
            <div className="flex flex-col justify-center gap-2 sm:flex-row">
              <Input placeholder="Entrez votre email" />
              <Button>S'inscrire</Button>
            </div>
            <p className="mt-2 text-left text-xs text-muted-foreground">
              Consultez notre{' '}
              <a href="#" className="underline hover:text-primary">
                politique de confidentialité
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

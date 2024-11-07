import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
  
export default function FAQ() 
{
    const faqs = [
        {
            question: 'Comment puis-je m’abonner au service?',
            answer: 'Pour vous abonner, cliquez sur le bouton "S’inscrire" en haut de la page, choisissez votre plan et suivez les instructions pour finaliser votre abonnement.',
        },
        {
            question: 'Quels sont les avantages de l’abonnement?',
            answer: 'L’abonnement vous permet d’accéder aux outils de gestion des patients, de créer et de suivre les fiches de consultations, et d’organiser votre agenda de manière optimale.',
        },
        {
            question: 'Puis-je essayer le service avant de m’abonner?',
            answer: 'Oui, nous offrons une période d’essai gratuite qui vous permet d’explorer toutes les fonctionnalités avant de vous engager.',
        },
        {
            question: 'Comment ajouter un nouveau patient?',
            answer: 'Pour ajouter un nouveau patient, rendez-vous dans la section "Gestion des patients" et cliquez sur "Ajouter un patient". Vous pourrez remplir les informations de contact, de santé, et autres détails pertinents.',
        },
        {
            question: 'Est-ce que mes données sont sécurisées?',
            answer: 'Oui, la sécurité de vos données est notre priorité. Toutes les informations de vos patients sont stockées de manière sécurisée et conforme aux régulations de confidentialité.',
        },
        {
            question: 'Comment gérer mon agenda?',
            answer: 'L’agenda est accessible dans la section "Mon agenda". Vous pouvez y ajouter, modifier, et supprimer des rendez-vous, ainsi que consulter vos créneaux disponibles.',
        },
    ];    

    return (
        <section>
        <div className="container flex flex-col justify-center mx-auto">
            <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-5xl">
            Questions fréquentes
            </h1>
            {faqs.map((faq, index) => (
            <Accordion key={index} type="single" collapsible>
                <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className="hover:text-foreground/60 hover:no-underline">
                    {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
            </Accordion>
            ))}
        </div>
        </section>
    );
};
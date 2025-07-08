<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class HomeController extends AbstractController
{
    #[Route('/', name: 'home')]
    public function index(): Response
    {
        return $this->render('index6.html.twig');
    }

    #[Route('/contact-submit', name: 'contact_form_submit', methods: ['POST'])]
    public function contactSubmit(Request $request, MailerInterface $mailer): Response
    {
        // Get the data from the form submission
        $name = $request->request->get('name', '');
        $fromEmail = $request->request->get('email', '');
        $phone = $request->request->get('phone', '');
        $service = $request->request->get('service', 'Not Specified');
        $message = $request->request->get('message', '');
        
        // Create the email
        $email = (new Email())
            ->from('noreply@sangreal-portfolio.com') // A professional, generic "from" address
            ->to('immanuelsangreal@gmail.com') // **This sends the email to YOU**
            ->subject('New Portfolio Inquiry: ' . $service)
            ->html("
                <h3>New Project Inquiry from Your Portfolio!</h3>
                <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
                <p><strong>Email:</strong> " . htmlspecialchars($fromEmail) . "</p>
                <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
                <p><strong>Service of Interest:</strong> " . htmlspecialchars($service) . "</p>
                <hr>
                <p><strong>Message:</strong></p>
                <p>" . nl2br(htmlspecialchars($message)) . "</p>
            ");

        // Send the email
        $mailer->send($email);

        // Add a success message to show the user
        $this->addFlash('success', 'Your message has been sent successfully! I will be in touch shortly.');

        // Redirect back to the homepage
        return $this->redirectToRoute('home');
    }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonIcon,
  IonButton
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    IonIcon,
    IonContent,
    IonButton
  ],
})
export class HomePage {
  // Informações pessoais
  nome = 'Eduardo França';
  localizacao = 'Vila Velha - Espírito Santo - Brasil';
  email = 'eduardo.correa2007@hotmail.com';
  telefone = '+55 (27) 99501-6103';
  curso = 'Bacharelado em Engenharia de Software';

  // Data de início da carreira (setembro de 2025)
  dataInicioCarreira = new Date('2025-09-01');

  constructor() {}

  // Calcula anos de experiência dinamicamente
  get anosExperiencia(): number {
    const agora = new Date();
    const diferencaAnos = agora.getFullYear() - this.dataInicioCarreira.getFullYear();
    const diferencaMeses = agora.getMonth() - this.dataInicioCarreira.getMonth();

    // Se ainda não chegou na data de início, retorna 0
    if (diferencaAnos < 0 || (diferencaAnos === 0 && diferencaMeses < 0)) {
      return 0;
    }

    // Se passou pelo menos 1 mês, considera 1+ ano
    if (diferencaAnos > 0 || diferencaMeses >= 0) {
      return Math.max(1, diferencaAnos);
    }

    return 0;
  }

  // Calcula projetos concluídos (pode ser ajustado conforme necessário)
  get projetosConcluidos(): number {
    const anos = this.anosExperiencia;
    return Math.max(5, anos * 5); // Mínimo 5 projetos, depois 5 por ano
  }


  // Método para abrir WhatsApp
  openWhatsApp() {
    const phoneNumber = '5527995016103'; // Número sem formatação
    const message = 'Olá Eduardo! Vim através do seu site e gostaria de conversar sobre um projeto.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  openLinkedIn() {
    const linkedinUrl = 'https://www.linkedin.com/in/eduardo-fran%C3%A7a-0a0006315/';
    window.open(linkedinUrl, '_blank');
  }

  openGitHub() {
    const githubUrl = 'https://github.com/Eduardo-Franca-Correa'; // Substitua pelo seu GitHub
    window.open(githubUrl, '_blank');
  }

  // Sistema de habilidades interativas
  selectedCategory = 'all';

  skills = [
    {
      id: 1,
      title: 'Mobile Development',
      description: 'Desenvolvimento de aplicações móveis',
      icon: 'phone-portrait-outline',
      level: 90,
      category: 'mobile',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      technologies: ['Ionic', 'Capacitor', 'Flutter'],
      visible: true,
      hovered: false,
      animateOut: false
    },
    {
      id: 2,
      title: 'Frontend Development',
      description: 'Criação de interfaces modernas e responsivas',
      icon: 'globe-outline',
      level: 95,
      category: 'frontend',
      gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
      technologies: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'SCSS'],
      visible: true,
      hovered: false,
      animateOut: false
    },
    {
      id: 3,
      title: 'Backend Development',
      description: 'Desenvolvimento de APIs robustas e escaláveis',
      icon: 'server-outline',
      level: 85,
      category: 'backend',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
      technologies: ['Node.js', 'NestJS', 'Java', 'REST APIs'],
      visible: true,
      hovered: false,
      animateOut: false
    },
  ];

  get filteredSkills() {
    if (this.selectedCategory === 'all') {
      return this.skills;
    }
    return this.skills.filter(skill => skill.category === this.selectedCategory);
  }

  filterSkills(category: string) {
    this.selectedCategory = category;

    // Primeiro, animar saída de todos os cards visíveis
    this.skills.forEach(skill => {
      if (skill.visible) {
        skill.animateOut = true;
      }
    });

    // Depois de 200ms, esconder todos e mostrar os filtrados
    setTimeout(() => {
      this.skills.forEach(skill => {
        skill.visible = false;
        skill.animateOut = false;
      });

      // Mostrar apenas os cards filtrados com animação
      const filteredSkills = this.filteredSkills;
      filteredSkills.forEach((skill, index) => {
        setTimeout(() => {
          skill.visible = true;
        }, index * 100); // Delay reduzido para 100ms
      });
    }, 200);
  }

  onSkillHover(skill: any) {
    skill.hovered = true;
  }

  onSkillLeave(skill: any) {
    skill.hovered = false;
  }
}

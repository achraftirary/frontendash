import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Course {
  id: number;
  title: string;
  professor: string;
  description: string;
  image: string;
  category: string;
  level: string;
  duration: string;
  students: number;
  rating: number;
  progress: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockCoursesService {
  private courses: Course[] = [
    {
      id: 1,
      title: 'Advanced Mathematics II',
      professor: 'Prof. Mohammed Hassan',
      description: 'Cover advanced topics in calculus, linear algebra, and differential equations.',
      image: 'assets/images/courses/math.jpg',
      category: 'Mathematics',
      level: 'Advanced',
      duration: '16 weeks',
      students: 150,
      rating: 4.8,
      progress: 75
    },
    {
      id: 2,
      title: 'Data Structures and Algorithms',
      professor: 'Prof. Sarah Ahmed',
      description: 'Learn fundamental data structures and algorithms used in computer science.',
      image: 'assets/images/courses/programming.jpg',
      category: 'Computer Science',
      level: 'Intermediate',
      duration: '12 weeks',
      students: 120,
      rating: 4.6,
      progress: 60
    },
    {
      id: 3,
      title: 'Statistical Analysis',
      professor: 'Prof. Karim Bensouda',
      description: 'Introduction to statistical methods and their applications.',
      image: 'assets/images/courses/statistics.jpg',
      category: 'Statistics',
      level: 'Beginner',
      duration: '10 weeks',
      students: 180,
      rating: 4.5,
      progress: 40
    },
    {
      id: 4,
      title: 'Microeconomics',
      professor: 'Prof. Fatima El Alaoui',
      description: 'Study of economic behavior at the individual and firm level.',
      image: 'assets/images/courses/economics.jpg',
      category: 'Economics',
      level: 'Intermediate',
      duration: '14 weeks',
      students: 130,
      rating: 4.7,
      progress: 30
    },
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      professor: 'Prof. Ahmed Bennani',
      description: 'Introduction to machine learning concepts and applications.',
      image: 'assets/images/courses/ml.jpg',
      category: 'Computer Science',
      level: 'Advanced',
      duration: '15 weeks',
      students: 90,
      rating: 4.9,
      progress: 20
    }
  ];

  constructor() {}

  getAllCourses(): Observable<Course[]> {
    return of(this.courses).pipe(delay(500));
  }

  getCourseById(id: number): Observable<Course | undefined> {
    const course = this.courses.find(c => c.id === id);
    return of(course).pipe(delay(500));
  }

  searchCourses(query: string): Observable<Course[]> {
    const filteredCourses = this.courses.filter(course => 
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.professor.toLowerCase().includes(query.toLowerCase()) ||
      course.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredCourses).pipe(delay(500));
  }

  filterCoursesByCategory(category: string): Observable<Course[]> {
    const filteredCourses = this.courses.filter(course => 
      course.category.toLowerCase() === category.toLowerCase()
    );
    return of(filteredCourses).pipe(delay(500));
  }

  filterCoursesByLevel(level: string): Observable<Course[]> {
    const filteredCourses = this.courses.filter(course => 
      course.level === level
    );
    return of(filteredCourses).pipe(delay(500));
  }
} 
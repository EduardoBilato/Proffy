import React, { useState, FormEvent, useEffect } from "react";

import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";

import api from "../../services/api";

import "./styles.css";

export default function TeacherList() {
  const [classes, setClasses] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    async function loadClasses() {
      const response = await api.get("classes");

      setClasses(response.data);
    }

    loadClasses();
  }, []);

  async function searchClasses(e: FormEvent) {
    e.preventDefault();

    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setClasses(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers" onSubmit={searchClasses}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            options={[
              { value: "Artes", label: "Artes" },
              { value: "História", label: "História" },
              { value: "Português", label: "Português" },
              { value: "Inglês", label: "Inglês" },
              { value: "Geografia", label: "Geografia" },
              { value: "Matemática", label: "Matemática" },
              { value: "Física", label: "Física" },
              { value: "Química", label: "Química" },
              { value: "Biologia", label: "Biologia" },
              { value: "Filosofia", label: "Filosofia" },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={(e) => setWeekDay(e.target.value)}
            options={[
              { value: "0", label: "Domingo" },
              { value: "1", label: "Segunda-feira" },
              { value: "2", label: "Terça-feira" },
              { value: "3", label: "Quarta-feira" },
              { value: "4", label: "Quinta-feira" },
              { value: "5", label: "Sexta-feira" },
              { value: "6", label: "Sábado" },
            ]}
          />
          <Input
            type="time"
            name="time"
            label="Hora"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {classes.map((teacher: Teacher) => (
          <TeacherItem key={teacher.id} teacher={teacher} />
        ))}
      </main>
    </div>
  );
}

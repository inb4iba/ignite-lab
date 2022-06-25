import { CheckCircle, Lock } from "phosphor-react";
import { isPast, format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: "live" | "class";
}

export function LessonCard(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();
  const isActiveLesson = slug === props.slug;

  const isLessonAvailabe = isPast(props.availableAt);
  const availableDateFormatted = format(
    props.availableAt,
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    { locale: ptBR }
  );

  return (
    <Link className="group" to={`/event/lesson/${props.slug}`}>
      <span className="text-gray-300">{availableDateFormatted}</span>
      <div
        className={`rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500 ${
          isActiveLesson && "bg-green-500"
        }`}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailabe ? (
            <span
              className={`flex text-sm ${
                isActiveLesson ? "text-white" : "text-blue-500"
              } font-medium items-center gap-2`}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span
              className={`flex text-sm text-orange-500 font-medium items-center gap-2`}
            >
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={`text-xs rounded px-2 py-[0.125rem] text-white border ${
              isActiveLesson ? "border-white" : "border-green-500"
            }`}
          >
            {props.type === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={`${
            isActiveLesson ? "text-white" : "text-gray-200"
          } mt-5 block`}
        >
          {props.title}
        </strong>
      </div>
    </Link>
  );
}

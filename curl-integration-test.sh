#!/bin/bash

HOST="localhost:5000";

#HOST="https://jobify-7552-taller2.herokuapp.com";

# ================== JOB_POSITIONS ==================
echo "================== JOB_POSITIONS =================="

echo "JOB_POSITION: 200 Todas los puestos de la categoría";
curl -v -XGET "$HOST/job_positions";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 404 Categoría inexistente";
curl -v -XGET "$HOST/job_positions/software";
echo -e "\n---------------------------------------------------------------------\n\n"



# ================== CATEGORIES ==================
echo "================== CATEGORIES =================="

echo "CATEGORY  200 Todas las categorías existentes";
curl -v -XGET "$HOST/categories";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY 201 Alta correcta";
curl -v -XPOST "$HOST/categories" -d 'name=software&description=Categoría. relacionada con software'
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY 201 Alta correcta";
curl -v -XPOST "$HOST/categories" -d 'name=oficina&description=Categoría relacionada con oficina'
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY 201 Alta correcta";
curl -v -XPOST "$HOST/categories" -d 'name=alimentos&description=Categoría relacionada con alimentos'
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY  200 Todas las categorías existentes";
curl -v -XGET "$HOST/categories";
echo -e "\n---------------------------------------------------------------------\n\n"


# ================== SKILLS ==================
echo "================== SKILLS =================="

echo "SKILLS 200 Todas las habilidades existentes";
curl -v -XGET "$HOST/skills";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 201 Alta correcta";
curl -v -XPOST "$HOST/skills/categories/software" -d 'description=Conoce Java&name=java';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 201 Alta correcta";
curl -v -XPOST "$HOST/skills/categories/software" -d 'description=Conoce bien C&name=c';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 201 Alta correcta";
curl -v -XPOST "$HOST/skills/categories/software" -d 'description=Conoce bien Android&name=android';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 201 Alta correcta";
curl -v -XPOST "$HOST/skills/categories/software" -d 'description=Empieza&name=trainee';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 200 Todas las habilidades existentes";
curl -v -XGET "$HOST/skills";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 200 Modificación correcta";
curl -v -XPUT "$HOST/skills/categories/software/java" -d 'description=Conoce bien Java&name=java&category=software';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 200 Todas las habilidades existentes";
curl -v -XGET "$HOST/skills";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 204 Baja correcta";
curl -v -XDELETE "$HOST/skills/categories/sorfware/trainee";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 201 Alta correcta";
curl -v -XPOST "$HOST/skills/categories/oficina" -d 'description=Chica capaz para administrar tareas&name=secretaria';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "SKILLS 200 Todas las habilidades existentes";
curl -v -XGET "$HOST/skills";
echo -e "\n---------------------------------------------------------------------\n\n"




# ================== JOB_POSITIONS ==================
echo "================== JOB_POSITIONS =================="

echo "JOB_POSITION: 200 Todas los puestos de la categoría";
curl -v -XGET "$HOST/job_positions/";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 201 Alta de puesto";
curl -v -XPOST "$HOST/job_positions/categories/software" -d 'name=senior&description=senior';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 201 Alta de puesto";
curl -v -XPOST "$HOST/job_positions/categories/software" -d 'name=semisenior&description=semisenior';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 201 Alta de puesto";
curl -v -XPOST "$HOST/job_positions/categories/software" -d 'name=junior&description=junior';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 201 Alta de puesto";
curl -v -XPOST "$HOST/job_positions/categories/software" -d 'name=trainee&description=trainee';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 201 Alta de puesto";
curl -v -XPOST "$HOST/job_positions/categories/oficina" -d 'name=secretaria&description=pro-activa';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 200 Update de puesto";
curl -v -XPOST "$HOST/job_positions/categories/oficina/secretaria" -d 'name=secretaria&description=Pro-Activa';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 200 Todas los puestos de la categoría";
curl -v -XGET "$HOST/job_positions/software";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 200 Todas los puestos de la categoría";
curl -v -XGET "$HOST/job_positions/oficina";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "JOB_POSITION: 200 Todas los puestos de la categoría";
curl -v -XGET "$HOST/job_positions/alimentos";
echo -e "\n---------------------------------------------------------------------\n\n"



# ================== CATEGORIES ==================
echo "================== CATEGORIES =================="

echo "CATEGORY  200 Todas las categorías existentes";
curl -v -XGET "$HOST/categories";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY 200 Modificación correcta";
curl -v -XPUT "$HOST/categories/software" -d 'name=software&description=Categoría relacionada con software.';
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY ";
curl -v -XDELETE "$HOST/categories/alimentos";
echo -e "\n---------------------------------------------------------------------\n\n"

echo "CATEGORY ";
curl -v -XGET "$HOST/categories";
echo -e "\n---------------------------------------------------------------------\n\n"




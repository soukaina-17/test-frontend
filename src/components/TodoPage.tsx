import { Check, Delete } from '@mui/icons-material';
import { Box, Button, Container, IconButton, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import useFetch from '../hooks/useFetch.ts';
import { Task } from '../index';

const TodoPage = () => {
  const api = useFetch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>(''); 
  const [editingTask, setEditingTask] = useState<Task | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); // État de chargement

  // Fonction pour récupérer les tâches
  const handleFetchTasks = async () => {
    setLoading(true); // Démarrer le chargement
    try {
      const fetchedTasks = await api.get('/tasks');
      console.log('Fetched Tasks:', fetchedTasks); // Pour déboguer

      // Gestion des différents formats de réponse
      if (Array.isArray(fetchedTasks)) {
        setTasks(fetchedTasks); // Si c'est un tableau directement
      } else if (Array.isArray(fetchedTasks.tasks)) {
        setTasks(fetchedTasks.tasks); // Si c'est un objet avec une clé `tasks`
      } else {
        setTasks([]); // Si la structure n'est pas attendue, on vide les tâches
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setTasks([]); // En cas d'erreur, on vide les tâches
    }
    setLoading(false); // Fin du chargement
  };

  // Fonction pour supprimer une tâche
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/tasks/${id}`);
      handleFetchTasks(); // Recharger les tâches après suppression
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Fonction pour ajouter ou modifier une tâche
  const handleSave = async () => {
    if (editingTask) {
      // Mise à jour de la tâche si son nom a changé
      if (editingTask.name !== newTask.trim()) {
        try {
          await api.patch(`/tasks/${editingTask.id}`, { name: newTask.trim() });
          setEditingTask(null); // Réinitialiser l'édition
          handleFetchTasks(); // Recharger les tâches après modification
        } catch (error) {
          console.error("Error updating task:", error);
        }
      }
    } else {
      // Ajouter une nouvelle tâche si le champ n'est pas vide
      if (newTask.trim()) {
        try {
          await api.post('/tasks', { name: newTask.trim() });
          setNewTask(''); // Réinitialiser le champ de texte
          handleFetchTasks(); // Recharger les tâches après ajout
        } catch (error) {
          console.error("Error saving task:", error);
        }
      } else {
        alert("Task name cannot be empty.");
      }
    }
  };

  // Fonction pour activer l'édition d'une tâche
  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setNewTask(task.name); // Remplir le champ avec le nom de la tâche
  };

  // Charger les tâches au montage du composant
  useEffect(() => {
    handleFetchTasks();  
  }, []);

  return (
    <Container>
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h2">HDM Todo List</Typography>
      </Box>

      <Box justifyContent="center" mt={5} flexDirection="column">
        {/* Affichage pendant le chargement */}
        {loading && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="h6">Loading tasks...</Typography>
          </Box>
        )}

        {/* Affichage des tâches */}
        {!loading && tasks.length === 0 && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Typography variant="h6">No tasks available</Typography>
          </Box>
        )}

        {/* Affichage des tâches récupérées */}
        {!loading && tasks.map((task) => (
          <Box display="flex" justifyContent="center" alignItems="center" mt={2} gap={1} width="100%" key={task.id}>
            <TextField
              size="small"
              value={task.id === editingTask?.id ? newTask : task.name} 
              fullWidth
              sx={{ maxWidth: 350 }}
              onChange={(e) => setNewTask(e.target.value)}
              disabled={task.id === editingTask?.id ? false : true} 
            />
            <Box>
              <IconButton
                color="success"
                onClick={() => handleSave()}
                disabled={task.id === editingTask?.id && newTask === task.name} 
              >
                <Check />
              </IconButton>
              <IconButton color="error" onClick={() => handleDelete(task.id)}>
                <Delete />
              </IconButton>
              <IconButton color="primary" onClick={() => handleEdit(task)}>
                Edit
              </IconButton>
            </Box>
          </Box>
        ))}

        {/* Zone d'ajout de tâche */}
        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            size="small"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            fullWidth
            sx={{ maxWidth: 350 }}
            placeholder="Add a new task"
          />
          <Button variant="outlined" onClick={handleSave}>Ajouter une tâche</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default TodoPage;

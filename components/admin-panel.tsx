"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Upload, LogOut, Plus, Trash2, Loader2 } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth, db } from "@/lib/firebase"
import { collection, addDoc, getDocs, deleteDoc, doc, Timestamp } from "firebase/firestore"

interface Movie {
  id: string
  title: string
  poster: string
  thumbnail: string
  googleDriveLink: string
  description: string
  genre: string[]
  rating: number
  duration: string
  year: number
  uploadedAt: Timestamp
}

export function AdminPanel() {
  const { user } = useAuth()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    poster: "",
    thumbnail: "",
    googleDriveLink: "",
    description: "",
    genre: "",
    rating: 5,
    duration: "120 min",
    year: new Date().getFullYear(),
  })

  const loadMovies = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "movies"))
      const moviesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Movie[]
      setMovies(moviesData.sort((a, b) => b.uploadedAt.toMillis() - a.uploadedAt.toMillis()))
    } catch (error) {
      console.error("Error loading movies:", error)
    }
  }

  const handleAddMovie = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const docRef = await addDoc(collection(db, "movies"), {
        ...formData,
        genre: formData.genre.split(",").map((g) => g.trim()),
        uploadedAt: Timestamp.now(),
      })

      setFormData({
        title: "",
        poster: "",
        thumbnail: "",
        googleDriveLink: "",
        description: "",
        genre: "",
        rating: 5,
        duration: "120 min",
        year: new Date().getFullYear(),
      })

      await loadMovies()
    } catch (error) {
      console.error("Error adding movie:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMovie = async (movieId: string) => {
    try {
      await deleteDoc(doc(db, "movies", movieId))
      await loadMovies()
    } catch (error) {
      console.error("Error deleting movie:", error)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <p className="text-muted-foreground">Manage Flixory Movies</p>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">{user?.email}</span>
            <Button variant="destructive" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Movie Form */}
          <Card className="lg:col-span-1 bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Add New Movie</CardTitle>
              <CardDescription className="text-muted-foreground">Upload a new movie to Flixory</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddMovie} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-foreground">
                    Movie Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-input border-border text-foreground"
                    placeholder="Enter movie title"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="poster" className="text-foreground">
                    Poster Image URL
                  </Label>
                  <Input
                    id="poster"
                    value={formData.poster}
                    onChange={(e) => setFormData({ ...formData, poster: e.target.value })}
                    className="bg-input border-border text-foreground"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="thumbnail" className="text-foreground">
                    Thumbnail URL
                  </Label>
                  <Input
                    id="thumbnail"
                    value={formData.thumbnail}
                    onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                    className="bg-input border-border text-foreground"
                    placeholder="https://..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="googleDriveLink" className="text-foreground">
                    Google Drive Link
                  </Label>
                  <Input
                    id="googleDriveLink"
                    value={formData.googleDriveLink}
                    onChange={(e) => setFormData({ ...formData, googleDriveLink: e.target.value })}
                    className="bg-input border-border text-foreground"
                    placeholder="https://drive.google.com/file/d/..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-input border-border text-foreground min-h-20"
                    placeholder="Movie description"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="genre" className="text-foreground">
                    Genre (comma-separated)
                  </Label>
                  <Input
                    id="genre"
                    value={formData.genre}
                    onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    className="bg-input border-border text-foreground"
                    placeholder="Action, Drama, Comedy"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="rating" className="text-foreground">
                      Rating
                    </Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="10"
                      step="0.1"
                      value={formData.rating}
                      onChange={(e) => setFormData({ ...formData, rating: Number.parseFloat(e.target.value) })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year" className="text-foreground">
                      Year
                    </Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
                      className="bg-input border-border text-foreground"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={loading}
                >
                  {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  <Plus className="w-4 h-4 mr-2" />
                  Add Movie
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Movies List */}
          <Card className="lg:col-span-2 bg-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-foreground">Movies</CardTitle>
                  <CardDescription className="text-muted-foreground">{movies.length} movies uploaded</CardDescription>
                </div>
                <Button
                  variant="outline"
                  onClick={loadMovies}
                  className="text-foreground border-border hover:bg-input bg-transparent"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {movies.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No movies yet. Add one to get started!</p>
                  </div>
                ) : (
                  movies.map((movie) => (
                    <div key={movie.id} className="bg-input border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{movie.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">
                              {movie.uploadedAt.toDate().toLocaleString()}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">{movie.year}</span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground">⭐ {movie.rating}</span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-2">{movie.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {movie.genre.map((g) => (
                              <span key={g} className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                                {g}
                              </span>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteMovie(movie.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

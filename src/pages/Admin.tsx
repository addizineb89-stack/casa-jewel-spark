import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Shield, CheckCircle, Clock, XCircle } from "lucide-react";

interface Subscription {
  id: string;
  email: string;
  full_name: string;
  plan_name: string;
  plan_price: number;
  status: string;
  created_at: string;
}

const Admin = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    supabase
      .rpc("has_role", { _user_id: user.id, _role: "admin" })
      .then(({ data }) => {
        setIsAdmin(!!data);
        if (data) fetchSubscriptions();
        else setLoading(false);
      });
  }, [isAuthenticated, user]);

  const fetchSubscriptions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("subscriptions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setSubscriptions(data);
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from("subscriptions")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Mis à jour", description: `Statut changé en "${status}"` });
      fetchSubscriptions();
    }
  };

  if (authLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-8 pb-8 space-y-3">
            <Shield className="w-12 h-12 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-display font-bold">Accès refusé</h2>
            <p className="text-muted-foreground font-body">Vous n'avez pas les droits d'administration.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "pending": return <Badge variant="outline" className="gap-1 text-amber-600 border-amber-400"><Clock className="w-3 h-3" />En attente</Badge>;
      case "active": return <Badge className="gap-1 bg-green-600"><CheckCircle className="w-3 h-3" />Actif</Badge>;
      case "rejected": return <Badge variant="destructive" className="gap-1"><XCircle className="w-3 h-3" />Refusé</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const pending = subscriptions.filter(s => s.status === "pending");
  const others = subscriptions.filter(s => s.status !== "pending");

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-primary" />
        <h1 className="text-2xl font-display font-bold">Administration</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" />
            Demandes en attente ({pending.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p className="text-muted-foreground">Chargement…</p>
          ) : pending.length === 0 ? (
            <p className="text-muted-foreground">Aucune demande en attente 🎉</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pending.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.plan_name} — {s.plan_price} DH</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString("fr-MA")}
                    </TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" onClick={() => updateStatus(s.id, "active")} className="gold-gradient text-primary-foreground">
                        ✓ Valider
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => updateStatus(s.id, "rejected")}>
                        ✗ Refuser
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {others.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Historique</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {others.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.plan_name} — {s.plan_price} DH</TableCell>
                    <TableCell>{statusBadge(s.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(s.created_at).toLocaleDateString("fr-MA")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Admin;

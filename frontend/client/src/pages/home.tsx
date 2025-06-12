import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { predictionSchema, type PredictionInput, type PredictionResult } from "@shared/schema";
import { 
  TrendingUp, 
  User, 
  DollarSign, 
  Settings, 
  ChevronDown, 
  Sparkles, 
  PieChart, 
  Loader2,
  CheckCircle,
  AlertTriangle,
  Shield,
  Bot,
  Clock,
  Star,
  Calendar,
  Lightbulb,
  BarChart3
} from "lucide-react";

type ResultState = 'empty' | 'loading' | 'success' | 'error';

export default function Home() {
  const [resultState, setResultState] = useState<ResultState>('empty');
  const [predictionResults, setPredictionResults] = useState<PredictionResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const { toast } = useToast();

  const form = useForm<PredictionInput>({
    resolver: zodResolver(predictionSchema.extend({
      apiUrl: predictionSchema.shape.apiUrl.default("http://localhost:8000/api/predict")
    })),
    defaultValues: {
      age: "" as any,
      salary: "" as any,
      apiUrl: "http://localhost:8000/api/predict",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: PredictionInput) => {
      const response = await apiRequest("POST", "/api/predict", {
        age: data.age,
        salary: data.salary
      });
      return response.json();
    },
    onSuccess: (data: PredictionResult) => {
      setPredictionResults(data);
      setResultState('success');
      // toast({
      //   title: "Prediction Generated",
      //   description: "Your financial analysis is ready!",
      // });
    },
    onError: (error: Error) => {
      console.error('Prediction error:', error);
      setErrorMessage(error.message || "Unable to connect to the prediction service. Please check your API endpoint and try again.");
      setResultState('error');
      toast({
        title: "Prediction Failed", 
        description: "Please try again or check your API configuration.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: PredictionInput) => {
    setResultState('loading');
    mutation.mutate(data);
  };

  const resetResults = () => {
    setResultState('empty');
    setPredictionResults(null);
    setErrorMessage('');
    form.reset();
  };

  const formatSalary = (value: string) => {
    const numericValue = value.replace(/,/g, '');
    if (!isNaN(Number(numericValue)) && numericValue !== '') {
      return parseInt(numericValue).toLocaleString();
    }
    return value;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="text-white text-sm" size={16} />
              </div>
              <h1 className="text-xl font-semibold text-slate-900">Social Media Advertisement Affect Predictor</h1>
            </div>
            <div className="text-sm text-slate-500">
              AI-Powered Analysis
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Form Container */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Prediction Form */}
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Enter Your Information</h2>
                <p className="text-slate-600">Provide your age and salary for personalized financial prediction</p>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Age Input */}
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-slate-700">
                          <User className="mr-2 text-slate-400" size={16} />
                          Age
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            min="1"
                            max="100"
                            className="px-4 py-3 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            {...field}
                            onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : "")}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Salary Input */}
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-slate-700">
                          <DollarSign className="mr-2 text-slate-400" size={16} />
                          Annual Salary
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your annual salary"
                            className="px-4 py-3 border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            {...field}
                            value={field.value ? formatSalary(field.value.toString()) : ''}
                            onChange={(e) => {
                              const numericValue = e.target.value.replace(/,/g, '');
                              field.onChange(numericValue ? parseFloat(numericValue) : "");
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 font-medium py-3 px-6"
                    disabled={mutation.isPending}
                  >
                    {mutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        Predict
                        <Sparkles className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>

                  {/* API Configuration Section */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <Collapsible>
                      <CollapsibleTrigger className="w-full flex items-center justify-between text-sm font-medium text-slate-700 hover:text-slate-900">
                        <span className="flex items-center">
                          <Settings className="mr-2 text-slate-400" size={16} />
                          API Configuration
                        </span>
                        <ChevronDown className="h-4 w-4 transition-transform data-[state=open]:rotate-180" />
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-3">
                        <FormField
                          control={form.control}
                          name="apiUrl"
                          render={({ field }) => (
                            <FormItem>
                              <Label htmlFor="apiUrl" className="text-xs font-medium text-slate-600">
                                API Endpoint URL
                              </Label>
                              <FormControl>
                                <Input
                                  type="url"
                                  placeholder="http://localhost:8000/api/predict"
                                  className="text-sm px-3 py-2 border-slate-300 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
            </CardContent>
          </Card>

          {/* Results Display */}
          <Card className="shadow-sm border-slate-200">
            <CardContent className="p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">Prediction Results</h2>
                {/* <p className="text-slate-600">Your personalized financial analysis will appear here</p> */}
              </div>

              {/* Empty State */}
              {resultState === 'empty' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <PieChart className="text-2xl text-slate-400" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Ready for Analysis</h3>
                  <p className="text-slate-500 mb-4">{`Enter your information and click "Predict" or press "Enter" to see the result`}</p>
                </div>
              )}

              {/* Loading State */}
              {resultState === 'loading' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Loader2 className="text-2xl text-blue-500 animate-spin" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Analyzing Data</h3>
                  <p className="text-slate-500">Processing your information...</p>
                </div>
              )}

              {/* Success State */}
              {resultState === 'success' && predictionResults && (
                <div>
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center">
                      <CheckCircle className="text-emerald-500 mr-2" size={16} />
                      <span className="text-sm font-medium text-emerald-800">Prediction Generated Successfully</span>
                    </div>
                  </div>

                  {/* Prediction Result */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-3">
                        <Star className="text-blue-500 mr-2" size={20} />
                        <span className="text-sm font-medium text-blue-800">Prediction Result</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-900 mb-2">{predictionResults.prediction}</div>
                      <div className="text-sm text-blue-700">Based on your age and salary information</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Error State */}
              {resultState === 'error' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="text-2xl text-red-500" size={32} />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-2">Prediction Failed</h3>
                  <p className="text-slate-500 mb-4">{errorMessage}</p>
                  <Button 
                    onClick={resetResults}
                    variant="ghost"
                    className="text-blue-500 hover:text-blue-600 font-medium text-sm"
                  >
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>


      </main>
    </div>
  );
}
